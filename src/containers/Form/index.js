import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    type: "",
    email: "",
    message: "",
  });

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        // Reset form data after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          type: "",
          email: "",
          message: "",
        });
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={formData.firstName}
            onChange={(value) => handleChange("firstName", value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            value={formData.lastName}
            onChange={(value) => handleChange("lastName", value)}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => handleChange("type", value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder=""
            label="Email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={(value) => handleChange("message", value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
