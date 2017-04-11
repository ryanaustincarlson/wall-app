import login.forms as login_forms
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required

from django.core.mail import send_mail


@csrf_protect
def register(request):
    context = _build_context(request)
    if request.method == 'POST':
        form = login_forms.RegistrationForm(request.POST)
        if form.is_valid():
            new_user = User.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password1'],
            )

            success_url = reverse('login:register_success')
            if 'next' in context:
                success_url += '?next={}'.format(context['next'])

            send_mail(
                'Welcome to Bricks (a simple wall app)',
                'You successfully registered as {}.'.format(new_user.username),
                'Bricks Admin <rcarlsontsl@gmail.com>',
                [new_user.email],
                fail_silently=False
            )

            return HttpResponseRedirect(success_url)
    else:
        form = login_forms.RegistrationForm()

    context['form'] = form
    return render(request, 'registration/register.html', context)


@login_required
def whoami(request):
    context = {
        'user': request.user
    }
    context = _build_context(request, context)
    return render(request, 'registration/whoami.html', context)


def register_success(request):
    context = _build_context(request)
    return render(request, 'registration/success.html', context)


def logout_page(request):
    logout(request)
    context = _build_context(request)
    return render(request, 'registration/logout.html', context)


def _build_context(request, context={}):
    if 'next' in request.GET:
        context['next'] = request.GET['next']
    return context
