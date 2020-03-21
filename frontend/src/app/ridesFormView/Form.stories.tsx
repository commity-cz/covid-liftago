import {action} from '@storybook/addon-actions';
import React from 'react';
import {FormContext, useForm} from "react-hook-form";
import ContactFormContainer from "./ContactFormContainer";
import RidesForm from "./RidesForm";
import StopFormContainer from "./StopFormContainer";

export default {
  title: 'Form components',
};

export const StopFormContainerStory = () => {
  const methods = useForm();
  return (
    <FormContext {...methods} >
      <form onSubmit={methods.handleSubmit(action('onSubmit'))}>

        <StopFormContainer errorPath={[]}/>

        <button type="submit">story test button</button>
      </form>
    </FormContext>

  )
}

export const ContactFormContainerStory = () => {
  const methods = useForm();
  return (
    <FormContext {...methods} >
      <form onSubmit={methods.handleSubmit(action('onSubmit'))}>

        <ContactFormContainer errorPath={[]}
        />

        <button type="submit">story test button</button>
      </form>
    </FormContext>

  )
}

export const RidesFormStory = () => {
  return (

    <RidesForm onSubmit={action('onSubmit')}/>

  )
}
