import { action } from '@storybook/addon-actions';
import { Debug } from "mui-rff";
import { assocPath, split } from "ramda";
import React, { useState } from 'react';
import { Form } from 'react-final-form'
import { StopKind } from "../../../model";
import AddressFormContainer from "./AddressFormContainer";
import ContactFormContainer from "./ContactFormContainer";
import StopFormContainer from "./StopFormContainer";

export default {
  title: 'Final Form components',
};

export const ContactFormContainerStory = () => {
  return (
    <Form onSubmit={action('onSubmit')}
          initialValues={{
            contact: {
              phoneNumber: '+420'
            }
          }}>
      {(props: any) => {
        return (
          <form onSubmit={props.handleSubmit}>

            <ContactFormContainer name="contact"/>

            <Debug/>
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
