import { ListasDest } from './listas-dest';

describe('ListasDest', () => {
  it('should create an instance', () => {
    expect(new ListasDest("new lista", new Date())).toBeTruthy();
  });
});
