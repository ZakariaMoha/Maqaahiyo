import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useForm } from '../../hooks/useForm';
import { validateEmail, validatePhone } from '../../utils/validation';

interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

const initialValues: ReservationFormData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
};

const validate = (values: ReservationFormData) => {
  const errors: Partial<Record<keyof ReservationFormData, string>> = {};
  
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) errors.email = 'Email is required';
  else if (!validateEmail(values.email)) errors.email = 'Invalid email address';
  if (!values.phone) errors.phone = 'Phone is required';
  else if (!validatePhone(values.phone)) errors.phone = 'Invalid phone number';
  
  return errors;
};

export default function ReservationFormFields() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues,
    validate,
    onSubmit: async (values) => {
      // Handle form submission
      console.log('Form submitted:', values);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />
        
        <Input
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date"
          type="date"
          value={values.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          required
        />
        
        <Input
          label="Time"
          type="time"
          value={values.time}
          onChange={(e) => handleChange('time', e.target.value)}
          error={errors.time}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? 'Submitting...' : 'Reserve Table'}
      </Button>
    </form>
  );
}