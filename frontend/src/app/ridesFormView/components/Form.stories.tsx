import { Button } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { Debug, makeValidate } from "mui-rff";
import { assocPath, split } from "ramda";
import React, { useState } from 'react';
import { Form } from 'react-final-form'
import * as yup from "yup";
import { StopKind } from "../../../model";
import AddressFormContainer from "./AddressFormContainer";
import ContactFormContainer, { contactSchema } from "./ContactFormContainer";
import RidesForm from "./RidesForm";
import StopFormContainer from "./StopFormContainer";

export default {
  title: 'Final Form components',
};

let contactStorySchema = yup.object().shape({
  contact: contactSchema
})

const spy = (name: string, f: any) => (...args: any[]) => {
  console.log(name, ' ￿call with', args);
  const r = f(...args)
  console.log(name, ' ￿return', r);

  return r;
}

const contactValidate = spy('contactValidate', makeValidate(contactStorySchema))


export const ContactFormContainerStory = () => {

  return (


    <Form onSubmit={action('onSubmit')}
          validate={contactValidate}
          initialValues={{
            contact: {
              name: '',
              phoneNumber: '+420',
              company: ''
            }
          }}>
      {(props: any) => {
        return (
          <form onSubmit={props.handleSubmit}>

            <ContactFormContainer name="contact"/>

            <Debug/>
            <Button type={"submit"}>Send</Button>
          </form>
        )
      }
      }
    </Form>
  )
}

export const AddressFormContainerStory = () => {
  const [data, setData] = useState({});

  return (
    <Form onSubmit={action('onSubmit')}
          initialValues={data}>
      {(props: any) => {
        return (
          <form onSubmit={props.handleSubmit}>

            <AddressFormContainer name="address" updateAddress={(address) => setData({ address })}/>

            <Debug/>
            <Button>Send</Button>
          </form>
        )
      }}
    </Form>
  )
}

const stringPathToArray = split(/\]?\.|\[/)

export const StopFormContainerStory = () => {
  const [data, setData] = useState({});
  const updateData = (path: string, values: any) => {
    const arrayPath = stringPathToArray(path);
    const newData = assocPath(arrayPath, values, data)
    setData(newData)
  }

  return (
    <Form onSubmit={action('onSubmit')}
          initialValues={data}>
      {(props: any) => {
        return (
          <form onSubmit={props.handleSubmit}>

            <StopFormContainer name="stop" kind={StopKind.PICKUP} updateValues={updateData}/>

            <Debug/>
          </form>
        )
      }}
    </Form>
  )
}


export const RidesFormStory = () => {
  return (
    <RidesForm onSubmit={action('onSubmit') as (data: any) => Promise<void>} />
  )
}
