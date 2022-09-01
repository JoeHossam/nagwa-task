import {
    fireEvent,
    getByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import App from './App';
import { api_url } from './constants';

jest.mock('axios');

const setup = () => {
    const utils = render(<App />);
    return { ...utils };
};

// Jest will display warrnings because the timer is always updating.
// Could be fixed if I had more time
test('The words counter updates correctly', (done) => {
    const words = {
        data: {
            words: [
                {
                    id: 12,
                    word: 'independent',
                    pos: 'adjective',
                },
                {
                    id: 6,
                    word: 'walk',
                    pos: 'verb',
                },
                {
                    id: 7,
                    word: 'fast',
                    pos: 'adjective',
                },
                {
                    id: 1,
                    word: 'slowly',
                    pos: 'adverb',
                },
                {
                    id: 9,
                    word: 'crowded',
                    pos: 'adjective',
                },
                {
                    id: 15,
                    word: 'heavily',
                    pos: 'adverb',
                },
                {
                    id: 2,
                    word: 'ride',
                    pos: 'verb',
                },
                {
                    id: 11,
                    word: 'emit',
                    pos: 'verb',
                },
                {
                    id: 5,
                    word: 'emissions',
                    pos: 'noun',
                },
                {
                    id: 3,
                    word: 'bus',
                    pos: 'noun',
                },
            ],
        },
    };
    axios.get.mockResolvedValueOnce(words);

    act(() => {
        const { getByTestId } = setup();

        setTimeout(async () => {
            expect(axios.get).toHaveBeenCalledWith(`${api_url}/word`);
            let title = getByTestId('title'); // grab title
            const answerNoun = getByTestId('noun'); // grab first choice
            expect(title).toHaveTextContent('Word 1 out of 10');
            fireEvent.click(answerNoun);
            title = getByTestId('title');
            await new Promise((r) => setTimeout(r, 2000)); //wait for 2 seconds
            expect(title).toHaveTextContent('Word 2 out of 10'); // check if counter changed
            done();
        }, 500);
    });
});

test('display error message if api is down', (done) => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    act(() => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation();
        setup();
        setTimeout(async () => {
            expect(alertMock).toHaveBeenCalledTimes(1);
            done();
        }, 2000);
    });
});
