import { describe, it, expect } from 'vitest';
import { add } from './math';
describe('add', () => {
    it('should add two numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
    });
});
