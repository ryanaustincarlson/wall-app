from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from posts.models import Post
from django.contrib.auth.models import User


class PostsTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_user')
        self.other_user = User.objects.create(username='other_user')

    def test_post_auth(self):
        self.client.force_login(self.user)

        url = reverse('post-list')
        data = {'text': 'some text'}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().text, 'some text')

    def test_post_noauth(self):
        url = reverse('post-list')
        data = {'text': 'some text'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Post.objects.count(), 0)

    def test_get_nonecreated(self):
        url = reverse('post-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_list(self):
        wallpost_texts = ['testing123', 'testing456']
        for text in wallpost_texts:
            Post.objects.create(text=text, author=self.user)
        self.assertEqual(len(Post.objects.all()), len(wallpost_texts))

        url = reverse('post-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), len(wallpost_texts))

        for response_post, text in zip(response.data, wallpost_texts):
            self.assertEqual(response_post['text'], text)

    def test_get_wallpost(self):
        wallpost_texts = ['testing123', 'testing456']
        for text in wallpost_texts:
            Post.objects.create(text=text, author=self.user)
        self.assertEqual(len(Post.objects.all()), len(wallpost_texts))

        for wallpost in Post.objects.all():
            url = reverse('post-detail', args=[wallpost.id])
            response = self.client.get(url, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertTrue('text' in response.data)
            self.assertEqual(response.data['text'], wallpost.text)

    def test_put_auth(self):
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(wallpost.text, text)

        url = reverse('post-detail', args=[wallpost.id])

        self.client.force_login(self.user)

        newtext = 'updated text!'
        response = self.client.put(url, {'text': newtext})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check that text changed
        wallpost = Post.objects.get(id=wallpost.id)
        self.assertEqual(wallpost.text, newtext)

    def test_put_badauth(self):
        '''
            Authenticate as a different user, try to make an update
        '''
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(wallpost.text, text)

        url = reverse('post-detail', args=[wallpost.id])

        self.client.force_login(self.other_user)

        response = self.client.put(url, {'text': 'not gonna happen'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # check that text hasn't changed
        wallpost = Post.objects.get(id=wallpost.id)
        self.assertEqual(wallpost.text, text)

    def test_put_noauth(self):
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(wallpost.text, text)

        url = reverse('post-detail', args=[wallpost.id])

        response = self.client.put(url, {'text': 'not gonna happen'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # check that text hasn't changed
        wallpost = Post.objects.get(id=wallpost.id)
        self.assertEqual(wallpost.text, text)

    def test_patch_auth(self):
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(wallpost.text, text)

        url = reverse('post-detail', args=[wallpost.id])

        self.client.force_login(self.user)

        newtext = 'updated text!'
        response = self.client.patch(url, {'text': newtext})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check that text changed
        wallpost = Post.objects.get(id=wallpost.id)
        self.assertEqual(wallpost.text, newtext)

    def test_patch_badauth(self):
        '''
            Authenticate as a different user, try to make an update
        '''
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(wallpost.text, text)

        url = reverse('post-detail', args=[wallpost.id])

        self.client.force_login(self.other_user)

        response = self.client.patch(url, {'text': 'not gonna happen'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # check that text hasn't changed
        wallpost = Post.objects.get(id=wallpost.id)
        self.assertEqual(wallpost.text, text)

    def test_patch_noauth(self):
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(wallpost.text, text)

        url = reverse('post-detail', args=[wallpost.id])

        response = self.client.patch(url, {'text': 'not gonna happen'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # check that text hasn't changed
        wallpost = Post.objects.get(id=wallpost.id)
        self.assertEqual(wallpost.text, text)

    def test_delete_auth(self):
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(len(Post.objects.all()), 1)

        url = reverse('post-detail', args=[wallpost.id])

        self.client.force_login(self.user)

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertEqual(len(Post.objects.all()), 0)

    def test_delete_badauth(self):
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(len(Post.objects.all()), 1)

        url = reverse('post-detail', args=[wallpost.id])

        self.client.force_login(self.other_user)

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.assertEqual(len(Post.objects.all()), 1)

    def test_delete_noauth(self):
        text = 'testing123'
        wallpost = Post.objects.create(text=text, author=self.user)
        self.assertEqual(len(Post.objects.all()), 1)

        url = reverse('post-detail', args=[wallpost.id])

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.assertEqual(len(Post.objects.all()), 1)

    def test_create_then_get_then_patch_then_get_wallpost(self):
        '''
            Exercise each part of the API...

            Create a wall post using the API, then get all wall posts.
            Then get a specific wall post.
            Update that wall post.
            Finally, delete that wall post.
        '''
        self.client.force_login(self.user)

        list_url = reverse('post-list')
        post_texts = [
            'first post',
            'second post',
        ]

        for post_text in post_texts:
            post_response = self.client.post(list_url, {'text': post_text}, format='json')
            self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)

        # check that post text in db is expected
        self.assertEqual(Post.objects.count(), len(post_texts))
        all_posts = Post.objects.all()
        for post, post_text in zip(all_posts, post_texts):
            self.assertEqual(post.text, post_text)

        # before checking the post-list GET route, we start by logging
        # out b/c we don't need to be auth'd to list posts
        self.client.logout()

        # now check that the post-list route returns appropriate data
        response = self.client.get(list_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), len(post_texts))
        for response_post, post_text in zip(response.data, post_texts):
            self.assertEqual(response_post['text'], post_text)

        wallpost = Post.objects.all()[0]
        detail_url = reverse('post-detail', args=[wallpost.id])
        response = self.client.get(detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['text'], wallpost.text)

        self.client.force_login(self.user)

        updated_text = 'new, text. way better.'
        self.client.patch(detail_url, {'text': updated_text})

        wallpost = Post.objects.get(id=wallpost.id)
        self.assertEqual(wallpost.text, updated_text)

        self.client.delete(detail_url)
        with self.assertRaises(Post.DoesNotExist):
            Post.objects.get(id=wallpost.id)

        self.assertEqual(len(Post.objects.all()), len(post_texts) - 1)

    def test_current_user_noauth(self):
        ''' get current user, but none logged in '''
        url = reverse('whoami')
        response = self.client.get(url)
        self.assertEqual(response.data['username'], '')

    def test_current_user_auth(self):
        ''' get current user, logged in '''
        self.client.force_login(self.user)
        url = reverse('whoami')
        response = self.client.get(url)
        self.assertGreater(len(self.user.username), 0)
        self.assertEqual(response.data['username'], self.user.username)
