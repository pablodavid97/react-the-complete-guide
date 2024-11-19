import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting', () => {
    test('Renders hello world on to the screen', () => {
        render(<Greeting />);

        const textElement = screen.getByText('Hello World!');
        expect(textElement).toBeInTheDocument();
    });

    test('Text is default when it renders', () => {
        render(<Greeting />);

        const textElement = screen.getByText('good to see you', {
            exact: false,
        });
        expect(textElement).toBeInTheDocument();
    });

    test('Text changes when user clicks button', async () => {
        render(<Greeting />);

        const initialText = screen.getByText('good to see you', {
            exact: false,
        });
        expect(initialText).toBeInTheDocument();

        const changeBtn = screen.getByText('Change Text!');
        userEvent.click(changeBtn);

        const changedText = screen.getByRole('button');
        expect(changedText).toBeInTheDocument();
    });
});
