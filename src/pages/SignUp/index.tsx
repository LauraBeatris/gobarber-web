import React, { useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Helmet } from 'react-helmet';
import { FiLogIn, FiLock, FiMail, FiUser } from 'react-icons/fi';

import AuthLayout from '../../layouts/Auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';
import signUpBackground from '../../assets/sign-up-background.png';

import schema from './schema';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [t] = useTranslation();

  const handleSubmit = useCallback(async (data): Promise<void> => {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <AuthLayout backgroundPosition="right" backgroundImage={signUpBackground}>
      <Helmet>
        <title>GoBarber | Create an account</title>
      </Helmet>

      <img src={logo} aria-label="GoBarber" alt="GoBarber" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>{t('signup.create_an_account')}</h1>

        <Input
          name="name"
          type="text"
          autoCapitalize="none"
          placeholder={t('account_form.full_name')}
          icon={FiUser}
        />
        <Input
          name="email"
          type="email"
          autoCapitalize="none"
          placeholder={t('account_form.email')}
          icon={FiMail}
        />
        <Input
          name="password"
          type="password"
          placeholder={t('account_form.password')}
          icon={FiLock}
        />

        <Button type="submit">{t('buttons.confirm')}</Button>
      </Form>

      <a href="#">
        <FiLogIn />
        {t('signup.already_have_an_account')}
      </a>
    </AuthLayout>
  );
};

export default SignUp;
