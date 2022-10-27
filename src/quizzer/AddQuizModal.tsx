import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

// line 7: Property 'show' does not exist on type '{}'.
// line 10: {show: Function, handleClose: Function, addQuiz: Function}
export const AddQuizModal = ({
    show,
    handleClose,
    addQuiz
}: {show: Function, handleClose: Function, addQuiz: Function
}) => {
    const [title, setTitle] = useState<string>("Example Quiz");

    const saveChanges = () => {
        addQuiz(title, body);
        setTitle("Example Quiz");
        setBody("Example Description");
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formQuizId">
                        <Form.Label>Title: </Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setTitle(e.target.value)}
                        ></Form.Control>
                        <Form.Label>Description: </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={body}
                            onChange={}
                        ></Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setTitle("Example Quiz");
                            setBody("Example Description");
                            handleClose();
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
