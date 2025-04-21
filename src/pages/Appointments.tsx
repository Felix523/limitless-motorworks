import {
  ActionIcon,
  Button,
  Fieldset,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { IconClock } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { BookingForm, Email } from "../types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import HeaderNavbar from "../components/HeaderNavbar";
import { SERVICE_OPTIONS } from "../constants/ServiceOptions";
import { TIME_SLOTS } from "../constants/TimeSlots";
import styles from "../styles/Appointments.module.css";

const Appointments: React.FC<{ clientName: string }> = ({ clientName }) => {
  const [confirmationNumber] = useState<string>(
    Math.floor(Math.random() * 1000000).toString()
  );
  const [customerEmail, setCustomerEmail] = useState<Email>({
    recipientEmail: "",
    subject: `Appointment Confirmation #${confirmationNumber}`,
    message: "",
  });
  const [companyEmail, setCompanyEmail] = useState<Email>({
    recipientEmail: "felixliu789@gmail.com",
    subject: `New Appointment Scheduled for Confirmation #${confirmationNumber}`,
    message: "",
  });
  const [message, setMessage] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("");
  const [formData, setFormData] = useState<BookingForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    service: null,
    description: "",
  });

  const navigate: NavigateFunction = useNavigate();
  const ref = useRef<HTMLInputElement>(null);

  const goToConfirmation = (): void => {
    navigate("/confirmation", { state: { confirmationNumber } });
  };

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  // TODO: Implement own form validation
  // const form = useForm({
  //   mode: "controlled",
  //   initialValues: { email: "", phone: "" },
  //   validate: {
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  //     phone: (value) =>
  //       /^[A-Za-z]+$/.test(value) ? "Invalid phone number" : null,
  //   },
  // });

  const isButtonDisabled: boolean =
    formData.firstName === "" ||
    formData.lastName === "" ||
    formData.email === "" ||
    formData.phone === "" ||
    formData.year === "" ||
    formData.make === "" ||
    formData.model === "" ||
    formData.service === null ||
    (formData.service?.value === "Other" && formData.description === "") ||
    date === null ||
    time === "";

  useEffect(() => {
    setCustomerEmail({
      ...customerEmail,
      recipientEmail: formData.email,
      message: `Hello ${formData.firstName} ${formData.lastName},
      \nYour appointment has been scheduled for ${date?.toLocaleDateString()} at ${time}.
      \nThank you for choosing Limitless MotorWorks!`,
    });
    setCompanyEmail({
      ...companyEmail,
      message: `Hello ${clientName},
      \nA new appointment has been scheduled for ${date?.toLocaleDateString()} at ${time}.
      \nHere are some information about this appointment:
      \nName: ${formData.firstName} ${formData.lastName}
      \nEmail: ${formData.email}
      \nPhone: ${formData.phone}
      \nVehicle: ${formData.year} ${formData.make} ${formData.model}
      \nService: ${formData.service?.value}
      ${
        formData.service?.value === "Other"
          ? `\nDescription: ${formData.description}`
          : ""
      }
      \nPlease be prepared for the appointment. If you cannot make it, contact the customer with the information above to reschedule.`,
    });
  }, [formData, time, date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send email to customer
      const response = await fetch("http://localhost:5005/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...customerEmail }),
      });
      const data = await response.json();
      setMessage(data.message);
      console.log("Email sent to customer:", data.message);

      // Send email to company
      const response2 = await fetch("http://localhost:5005/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...companyEmail, clientName }),
      });
      const data2 = await response2.json();
      setMessage(data2.message);
      console.log("Email sent to company:", data2.message);

      if (response.status === 200 && response2.status === 200) {
        console.log("message:", message);
        goToConfirmation();
      }
    } catch (error) {
      setMessage(
        "An error has occurred and email failed to send. Please try again."
      );
      console.log("Error in sending email due to:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <HeaderNavbar />
      <div style={{ marginLeft: "6%", width: "50%", margin: "auto" }}>
        <Title order={2} ta="center" pt={50} pb={10}>
          Set an appointment
        </Title>
        <Title order={6} ta="right" pb={10}>
          <Text span inherit c="red">
            *
          </Text>
          indicates required fields
        </Title>
        <Fieldset legend="Personal Information">
          <TextInput
            value={formData.firstName}
            onChange={(event) =>
              setFormData({ ...formData, firstName: event.currentTarget.value })
            }
            label="First Name"
            required={true}
          />
          <TextInput
            value={formData.lastName}
            onChange={(event) =>
              setFormData({ ...formData, lastName: event.currentTarget.value })
            }
            label="Last Name"
            required={true}
          />
          <TextInput
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.currentTarget.value })
            }
            label="Email"
            required={true}
          />
          <TextInput
            value={formData.phone}
            onChange={(event) =>
              setFormData({ ...formData, phone: event.currentTarget.value })
            }
            label="Phone #"
            required={true}
          />
        </Fieldset>
        <Fieldset legend="Vehicle Information">
          <NumberInput
            value={formData.year}
            onChange={(value) =>
              setFormData({ ...formData, year: value.toString() })
            }
            label="Year"
            required={true}
          />
          <TextInput
            value={formData.make}
            label="Make"
            onChange={(event) =>
              setFormData({ ...formData, make: event.currentTarget.value })
            }
            required={true}
          />
          <TextInput
            value={formData.model}
            label="Model"
            onChange={(event) =>
              setFormData({ ...formData, model: event.currentTarget.value })
            }
            required={true}
          />
        </Fieldset>
        <Fieldset legend="Appointment Information">
          <DatePickerInput
            value={date}
            onChange={setDate}
            label="Select date"
            excludeDate={(date: Date) =>
              date.getDay() === 0 || date.getDay() === 6
            }
            required={true}
          />
          <Select
            label="Select a Time"
            value={time}
            onChange={(value) => setTime(value || "")}
            disabled={!!date}
            data={TIME_SLOTS}
          />
          <Select
            label="Service"
            placeholder="Select a service"
            data={SERVICE_OPTIONS}
            value={formData.service ? formData.service.value : null}
            onChange={(_value, option) =>
              setFormData({ ...formData, service: option })
            }
            required={true}
          />
          {formData.service?.value === "Other" ? (
            <Textarea
              value={formData.description}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  description: event.currentTarget.value,
                })
              }
              label="Reason for appointment"
              placeholder="Short description"
              size="md"
              required={true}
            />
          ) : null}
        </Fieldset>
        <Button
          variant="filled"
          size="md"
          radius="md"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          ml={250}
          mt={10}
        >
          Schedule
        </Button>
      </div>
    </div>
  );
};

export default Appointments;
