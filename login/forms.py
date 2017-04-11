from django import forms
from django.contrib.auth.models import User


class RegistrationForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs=dict(required=True, max_length=50)),
                               label='Username')
    email = forms.EmailField(widget=forms.TextInput(attrs=dict(required=True, max_length=50)),
                             label='Email Address')
    password1 = forms.CharField(widget=forms.PasswordInput(attrs=dict(required=True, max_lenth=50, render_value=False)),
                                label='Password')
    password2 = forms.CharField(widget=forms.PasswordInput(attrs=dict(required=True, max_lenth=50, render_value=False)),
                                label='Confirm Password')

    def clean_username(self):
        username = self.cleaned_data['username']
        try:
            User.objects.get(username__iexact=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError("This username is already associated with an account")

    def clean(self):
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError('The two password fields did not match')
        return self.cleaned_data
