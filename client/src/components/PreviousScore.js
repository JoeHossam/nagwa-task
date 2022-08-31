import { Button, Modal } from '@mantine/core';
import React, { useState } from 'react';

const PreviousScore = () => {
    const [open, setOpen] = useState(false);
    const oldScores = JSON.parse(localStorage.getItem('previous_records')).map(
        (score, _) => <div key={_}>{score}</div>
    );
    return (
        <>
            <Button
                sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                }}
                color="indigo"
                onClick={() => setOpen(true)}
            >
                History
            </Button>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                overflow="inside"
                title="Your previous records!"
                sx={{
                    '& .mantine-Modal-modal': {
                        backgroundColor: '#16213E',
                        color: '#f8f9fa',
                    },
                }}
                overlayBlur={3}
                overlayOpacity={0.55}
            >
                {oldScores}
            </Modal>
        </>
    );
};

export default PreviousScore;
