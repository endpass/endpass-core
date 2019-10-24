import matchFiles from '../../lib/matchFiles';

describe('match files', () => {
  const content = `
  <some>
    tt('not.html.item_1');
    $t(
      'space.html.item_1'
    );
    $t(
      'space.html.item_2',
    );
  </some>   
  `;
  const readerMock = (fileName, cb) => {
    cb(false, content);
  };

  it('should parse and extract lang blocks', async () => {
    const fileName = 'path/to/file';

    const matches = await matchFiles([fileName], readerMock);

    expect(matches).toEqual({
      'space.html.item_1': fileName,
      'space.html.item_2': fileName,
    });
  });
});
