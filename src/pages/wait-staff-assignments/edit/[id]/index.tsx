import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getWaitStaffAssignmentById, updateWaitStaffAssignmentById } from 'apiSdk/wait-staff-assignments';
import { Error } from 'components/error';
import { waitStaffAssignmentValidationSchema } from 'validationSchema/wait-staff-assignments';
import { WaitStaffAssignmentInterface } from 'interfaces/wait-staff-assignment';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { TableInterface } from 'interfaces/table';
import { getUsers } from 'apiSdk/users';
import { getTables } from 'apiSdk/tables';

function WaitStaffAssignmentEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<WaitStaffAssignmentInterface>(
    () => (id ? `/wait-staff-assignments/${id}` : null),
    () => getWaitStaffAssignmentById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: WaitStaffAssignmentInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateWaitStaffAssignmentById(id, values);
      mutate(updated);
      resetForm();
      router.push('/wait-staff-assignments');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<WaitStaffAssignmentInterface>({
    initialValues: data,
    validationSchema: waitStaffAssignmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Wait Staff Assignment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<TableInterface>
              formik={formik}
              name={'table_id'}
              label={'Select Table'}
              placeholder={'Select Table'}
              fetcher={getTables}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.status}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'wait_staff_assignment',
  operation: AccessOperationEnum.UPDATE,
})(WaitStaffAssignmentEditPage);
