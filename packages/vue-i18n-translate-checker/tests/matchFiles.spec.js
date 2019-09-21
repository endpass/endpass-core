import matchFiles from '../matchFiles';

describe('match files', () => {
  const content = `
  <some>
    tt('not.html.item_0');
    $t(
      'space.html.item_1'
    );
    $t(
      'space.html.item_2',
    );
    $t('group.html.item_3');
    $t('group_1');
    $t('group.html.item_4', {});
    $t('group.html.item_41', {
        some
    });
    $t(
      'group.html.item_42',
      { some }
    );
    $t(
      'group.html.item_43',
      {
        some,
      }
    );
  </some>
    <script>
    block();
    lang.t(
      'space.script.item_5'
    );
    lang.t(
      'space.script.item_6',
    );
    lang.t('group.script.item_7');
    lang.t('group_2');
    lang.t('group.script.item_8', {});
    lang.t('group.script.item_81', {});
    lang.t(
        'group.script.item_82', 
        {}
    );
    lang.t(
        'group.script.item_83', 
        {}
    );

    langt('not.script.item_9', {});
    t('not.script.item_10', {});
    
    lang();
    </script>   
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
      'group.html.item_3': fileName,
      'group_1': fileName,
      'group.html.item_4': fileName,
      'group.html.item_41': fileName,
      'group.html.item_42': fileName,
      'group.html.item_43': fileName,
      'space.script.item_5': fileName,
      'space.script.item_6': fileName,
      'group.script.item_7': fileName,
      'group_2': fileName,
      'group.script.item_8': fileName,
      'group.script.item_81': fileName,
      'group.script.item_82': fileName,
      'group.script.item_83': fileName,
    });
  });
});
