import { useNewVendorForm } from '@/hooks/useNewVendorForm.tsx';
import { SyleniumModalProps } from '@/types.ts';
import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const NewVendorModal = ({ ledgerId }: SyleniumModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const props: SyleniumModalProps = {
    ledgerId: ledgerId,
    closeModal: close,
  };
  const { form, handleSubmit, errors } = useNewVendorForm(props);

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Vendor">
        {errors && <p className="text-sm text-red-500">{errors}</p>}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Vendor Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
            mt={10}
            mb={20}
          />

          <Group mt={20} mb={10}>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <Button onClick={open}>New Vendor</Button>
    </>
  );
};
