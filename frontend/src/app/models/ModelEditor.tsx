import React from "react";
import { Form, Button, Space } from "antd";
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
  useMasterDetailEditor,
  useCreateAntdResetForm,
  useEntityPersistCallbacks,
  useSubmitFailedCallback,
  ant_to_jmixFront,
  useChangeConfirm
} from "@haulmont/jmix-react-antd";
import {
  createAntdFormValidationMessages,
  EntityEditorProps
} from "@haulmont/jmix-react-web";
import { gql } from "@apollo/client";
import { Model } from "../../jmix/entities/Model";

const ENTITY_NAME = "Model";
const ROUTING_PATH = "/modelScreen";

const LOAD_MODEL = gql`
  query ModelById($id: String = "", $loadItem: Boolean!) {
    ModelById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      name
      releaseYear
    }
  }
`;

const UPSERT_MODEL = gql`
  mutation Upsert_Model($model: inp_Model!) {
    upsert_Model(model: $model) {
      id
    }
  }
`;

const ModelEditor = observer((props: EntityEditorProps<Model>) => {
  const {
    onCommit,
    entityInstance,
    submitBtnCaption = "common.submit"
  } = props;
  const [form] = useForm();
  const onSubmitFailed = useSubmitFailedCallback();
  const { setDirty } = useChangeConfirm();

  const fieldComponentProps = {
    onBlur: setDirty
  };

  const {
    executeLoadQuery,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    serverValidationErrors,
    intl,
    handleSubmit,
    handleCancelBtnClick
  } = useMasterDetailEditor<Model>({
    loadQuery: LOAD_MODEL,
    upsertMutation: UPSERT_MODEL,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    onCommit,
    entityInstance,
    useEntityEditorForm: createUseAntdForm(form),
    useEntityEditorFormValidation: createUseAntdFormValidation(form),
    resetEntityEditorForm: useCreateAntdResetForm(form),
    persistEntityCallbacks: useEntityPersistCallbacks(),
    uiKit_to_jmixFront: ant_to_jmixFront
  });

  if (queryLoading) {
    return <Spinner />;
  }

  if (queryError != null) {
    console.error(queryError);
    return <RetryDialog onRetry={executeLoadQuery} />;
  }

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={onSubmitFailed}
      layout="vertical"
      form={form}
      validateMessages={createAntdFormValidationMessages(intl)}
    >
      <Field
        entityName={ENTITY_NAME}
        propertyName="name"
        formItemProps={{
          style: { marginBottom: "12px" },
          rules: [{ required: true }]
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="releaseYear"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
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
  );
});

export default ModelEditor;
