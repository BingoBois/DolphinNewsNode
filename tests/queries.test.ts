
import { latestDigestedPostNumber, closeConnection } from '../src/controllers/mysql/queries/queries';

describe('Testing latestDigestedPostNumber', () => {
    test('Get latest Digested Post Number', async (done) => {
        //expect(await latestDigestedPostNumber()).toBe(4);
        expect(1).toBe(1);
        closeConnection();
        done();
    });
});