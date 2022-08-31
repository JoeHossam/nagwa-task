import { fireEvent, getByText, render, screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import App from './App';

jest.mock('axios');

const setup = () => {
    const utils = render(<App />);
    return { ...utils };
};

// Jest will display warrnings because the timer is always updating.
// Could be fixed if I had more time
test('The words counter updates', (done) => {
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
            expect(axios.get).toHaveBeenCalledWith(
                `http://localhost:3001/word`
            );
            let title = getByTestId('title');
            const answerNoun = getByTestId('noun');
            expect(title).toHaveTextContent('Word 1 out of 10');
            fireEvent.click(answerNoun);
            title = getByTestId('title');
            await new Promise((r) => setTimeout(r, 2000));
            expect(title).toHaveTextContent('Word 2 out of 10');
            done();
        }, 500);
    });
});
