import {  closeConnection } from '../src/controllers/mysql/queries/queries';
import { selectFromName} from '../src/controllers/mysql/queries/userQueries';
afterAll(() => {
  closeConnection();
});

test('bingotest', () => {
  return expect(selectFromName('bingomanden')).resolves.toBe(1);

  // Can also be written as:
  // selectFromName('bingomanden').then((id) => {
  //   expect(id).toBe(2);
  //   done();
  // });
});
