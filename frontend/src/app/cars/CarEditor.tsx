import React from "react";
import { Form, Button, Card, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { FormattedMessage } from "react-intl";
import {
  createUseAntdForm,
  createUseAntdFormValidation,
  RetryDialog,
  Field,
  GlobalErrorsAlert,
  Spinner,
  useEntityPersistCallbacks,
  useSubmitFailedCallback,
  ant_to_jmixFront
} from "@haulmont/jmix-react-antd";
import {
  createAntdFormValidationMessages,
  useEntityEditor,
  EntityEditorProps,
  registerEntityEditor,
  useDefaultEditorHotkeys
} from "@haulmont/jmix-react-web";
import { gql } from "@apollo/client";
import styles from "../../app/App.module.css";
import { Car } from "../../jmix/entities/Car";

const ENTITY_NAME = "Car";
const ROUTING_PATH = "/carEditor";

const LOAD_CAR = gql`
  query CarById($id: String = "", $loadItem: Boolean!) {
    CarById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      description
      model {
        id
        _instanceName
        name
      }
      price
      regNumber
    }
    ModelList {
      id
      _instanceName
    }
  }
`;

const UPSERT_CAR = gql`
  mutation Upsert_Car($car: inp_Car!) {
    upsert_Car(car: $car) {
      id
    }
  }
`;

const CarEditor = observer((props: EntityEditorProps<Car>) => {
  const {
    onCommit,
    entityInstance,
    submitBtnCaption = "common.submit"
  } = props;
  const [form] = useForm();
  const onSubmitFailed = useSubmitFailedCallback();
  const {
    relationOptions,
    executeLoadQuery,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    serverValidationErrors,
    intl,
    handleSubmit,
    handleCancelBtnClick
  } = useEntityEditor<Car>({
    loadQuery: LOAD_CAR,
    upsertMutation: UPSERT_CAR,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    onCommit,
    entityInstance,
    persistEntityCallbacks: useEntityPersistCallbacks(),
    uiKit_to_jmixFront: ant_to_jmixFront,
    useEntityEditorForm: createUseAntdForm(form),
    useEntityEditorFormValidation: createUseAntdFormValidation(form)
  });

  useDefaultEditorHotkeys({ saveEntity: form.submit });

  if (queryLoading) {
    return <Spinner />;
  }

  if (queryError != null) {
    console.error(queryError);
    return <RetryDialog onRetry={executeLoadQuery} />;
  }

  return (
    <Card className={styles.narrowLayout}>
      <Form
        onFinish={handleSubmit}
        onFinishFailed={onSubmitFailed}
        layout="vertical"
        form={form}
        validateMessages={createAntdFormValidationMessages(intl)}
      >
        <Field
          entityName={ENTITY_NAME}
          propertyName="regNumber"
          formItemProps={{
            style: { marginBottom: "12px" },
            rules: [{ required: true }]
          }}
        />
        <Field
          entityName={ENTITY_NAME}
          propertyName="model"
          associationOptions={relationOptions?.get("Model")}
          formItemProps={{
            style: { marginBottom: "12px" },
            rules: [{ required: true }]
          }}
        />
        <Field
          entityName={ENTITY_NAME}
          propertyName="price"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <Field
          entityName={ENTITY_NAME}
          propertyName="description"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

        <Form.Item style={{ textAlign: "center" }}>
          <Space size={8}>
            <Button htmlType="button" onClick={handleCancelBtnClick}>
              <FormattedMessage id="common.cancel" />
            </Button>
            <Button type="primary" htmlType="submit" loading={upsertLoading}>
              <FormattedMessage id={submitBtnCaption} />
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
});

registerEntityEditor({
  component: CarEditor,
  caption: "screen.CarEditor",
  screenId: "CarEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default CarEditor;
