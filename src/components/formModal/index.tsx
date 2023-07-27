import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react"
import { FC, ReactNode } from "react"

interface FormModalProps {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  header: string | ReactNode,
  body: string | ReactNode,
  onAccept: () => void
}

export const FormModal: FC<FormModalProps> = ({ isOpen, onClose, header, body, onAccept }) => {

  const handleAccept = () => {
    onAccept()
    onClose()
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {body}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='whatsapp' mr={3} onClick={handleAccept}>Yes</Button>
            <Button onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}