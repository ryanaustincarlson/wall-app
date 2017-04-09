from django import forms
from django.contrib.auth.models import User


class RegistrationForm(forms.Form):
    email = forms.EmailField(widget=forms.TextInput(attrs=dict(required=True, max_length=50)),
                             label='Email Address')
    password1 = forms.CharField(widget=forms.PasswordInput(attrs=dict(required=True, max_lenth=50, render_value=False)),
                                label="Password")
    password2 = forms.CharField(widget=forms.PasswordInput(attrs=dict(required=True, max_lenth=50, render_value=False)),
                                label="Confirm Password")

    def clean_email(self):
        email = self.cleaned_data['email']
        try:
            User.objects.get(username__iexact=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError("This email is already associated with an account")

    def clean(self):
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError('The two password fields did not match')
        return self.cleaned_data
