import TestRenderer from 'react-test-renderer';
import { Button } from './button';

describe('Корректная работа Button', () => {
    it('Проверяет корректность работы Button', () => {
        const button = TestRenderer.create(<Button />);
        // expect(button).toMatchSnapshot();
    });
})