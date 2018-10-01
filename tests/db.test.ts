import { selectFromName, closeConnection } from '../src/controllers/mysql/queries';

afterAll(() => {
  closeConnection();
});

test('bingotest', () => {
  return expect(selectFromName('bingomanden')).resolves.toBe(2);

  // Can also be written as:
  // selectFromName('bingomanden').then((id) => {
  //   expect(id).toBe(2);
  //   done();
  // });
});
