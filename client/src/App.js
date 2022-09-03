import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
    SimpleGrid,
    createStyles,
    Progress,
    Title,
    Loader,
    Modal,
    Button,
} from '@mantine/core';
import PreviousScore from './components/PreviousScore';
import { api_url } from './constants';

function App() {
    const [words, setWords] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [counter, setCounter] = useState(0); // used as an indicator of which word I am currently at in the words array
    const [progress, setProgress] = useState(0);
    const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0);
    const [modal, setModal] = useState({
        open: false,
        score: 0,
        rank: 0,
    }); // used to manage the rank modal
    const [active, setActive] = useState(true); // used for timer
    const [time, setTime] = useState(0);

    const { classes } = useStyles();

    const choices = ['noun', 'adverb', 'adjective', 'verb'].map((choice, _) => (
        <Choice
            key={_}
            className={classes.choice}
            title={choice}
            onClick={(e) => handleChoice(choice, e)}
            testid={choice}
        />
    ));

    const answered = {}; //used to keep record of the answered words, to prevent answering the same word twice

    const handleChoice = (choice, e) => {
        if (!words[counter]?.id || answered[words[counter].id]) return; //return if already answered before
        answered[words[counter].id] = 1;

        if (words[counter].pos === choice) {
            e.target.style.backgroundColor = '#2F9E44'; // Changing color for feedback
            e.target.style.borderColor = '#2F9E44';
            e.target.style.color = '#f8f9fa';
            setNumOfCorrectAnswers(numOfCorrectAnswers + 1);
        } else {
            e.target.style.backgroundColor = '#E03131';
            e.target.style.borderColor = '#E03131';
            e.target.style.color = '#f8f9fa';
        }

        setTimeout(() => {
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.borderColor = '#f8f9fa';
            e.target.style.color = '#16213E';
            setProgress(((counter + 1) / words.length) * 100);
            setCounter(counter + 1);
        }, 1000); // go to the next word after 1 second to let the user see the feedback
    };

    const handleFinishExam = async () => {
        const score = (numOfCorrectAnswers / words.length) * 100;
        try {
            const { data } = await axios.post(`${api_url}/rank`, { score });
            setModal({
                ...modal,
                open: true,
                score: score,
                rank: data.rank,
            });
            setActive(false);

            // for seeing the history
            if (localStorage.getItem('previous_records') === null) {
                localStorage.setItem(
                    'previous_records',
                    JSON.stringify([score])
                );
            } else {
                const oldScores = JSON.parse(
                    localStorage.getItem('previous_records')
                );
                oldScores.push(score);
                localStorage.setItem(
                    'previous_records',
                    JSON.stringify([...oldScores])
                );
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                alert('an error occured please refresh and try again'); // if score was not sent in request for some reason
            }
            alert('it seems that the api is down');
        }
    };

    const fetchWords = async () => {
        setFetching(true);
        try {
            const { data } = await axios.get(`${api_url}/word`);
            setWords(data.words);
            setCounter(0); // each time the words gets refetched, we set the counter back to 0
            setProgress(0);
        } catch (error) {
            alert('it seems that the api is down');
        }
        setFetching(false);
    };

    const reset = () => {
        fetchWords();
        setModal({ open: false, score: 0, rank: 0 });
        setNumOfCorrectAnswers(0);
        setActive(true);
        setTime(0);
    };

    useEffect(() => {
        if (fetching) return;
        if (counter === words.length) {
            handleFinishExam();
        }
    }, [counter]);

    useEffect(() => {
        fetchWords();
    }, []);

    // timer
    useEffect(() => {
        let interval = null;

        if (active) {
            interval = setInterval(() => {
                setTime((time) => time + 100);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [active]);

    // Display a loader while fetching data
    if (fetching) return <Loader />;

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <div>
                    <div>
                        <Title className={classes.titleHeader} color="white">
                            <div data-testid="title">
                                Word {counter + 1} out of {words.length}
                            </div>
                            <div>{Math.round(time / 1000)} s</div>
                        </Title>
                    </div>
                    <Progress
                        mt={8}
                        value={progress}
                        size={24}
                        label={`${progress}%`}
                    />
                </div>
                <div className={classes.bottom}>
                    <div className={classes.top}>
                        <Title order={3} color="white">
                            Which part of speech does this word belong to:
                        </Title>
                        <Title mt={24} color="white" order={1} align="center">
                            {words[counter]?.word}
                        </Title>
                    </div>
                    <SimpleGrid mt={20} cols={2}>
                        {choices}
                    </SimpleGrid>
                </div>
            </div>
            <Modal
                sx={{
                    '& .mantine-Modal-modal': {
                        backgroundColor: '#16213E',
                        color: '#f8f9fa',
                    },
                }}
                centered
                overlayBlur={3}
                overlayOpacity={0.55}
                opened={modal.open}
                onClose={() => setModal({ ...modal, open: false })}
                title={
                    modal.score >= 50
                        ? 'Congratulations! You Passed.'
                        : 'Try Again!'
                }
            >
                You answered <b>{modal.score}%</b> of the questions correctly.{' '}
                <br />
                Your rank is <b>{modal.rank}</b>. <br />
                You took: <b>{Math.round(time / 1000)}</b> seconds. <br />
                <Button size="xs" mt="12px" onClick={reset}>
                    Try Again
                </Button>
            </Modal>
            <PreviousScore />
        </div>
    );
}

const Choice = ({ title, className, onClick, testid }) => {
    return (
        <div data-testid={testid} onClick={onClick} className={className}>
            {title}
        </div>
    );
};

export default App;

const useStyles = createStyles((theme) => ({
    main: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#002B5B',
    },

    container: {
        borderRadius: '8px',
        width: '80%',
        margin: 'auto',
        padding: '32px',
        backgroundColor: '#16213E',
        color: '#16213E',
    },

    top: {
        backgroundColor: '#0F3460',
        padding: '16px',
        borderRadius: '8px',
    },

    bottom: {
        marginTop: '50px',
    },

    choice: {
        margin: '1rem',
        padding: '16px',
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textTransform: 'capitalize',
        fontWeight: 'bolder',
        backgroundColor: theme.colors.gray[0],
        '&:hover': {
            backgroundColor: theme.colors.gray[1],
        },
    },

    true: {
        backgroundColor: theme.colors.green[8],
    },

    false: {
        backgroundColor: theme.colors.red[8],
    },
    titleHeader: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
