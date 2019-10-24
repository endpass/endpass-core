import t from '../../../lib/matches/t';

describe('t match content', () => {
  const content = `
  <some>
    tt('not.html.item_1');
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
    t('not.script.item_11');
    
    lang();
    </script>   
  `;

  it('should parse and extract lang blocks', async () => {
    const matches = t(content);

    expect(matches).toEqual([
      'space.html.item_1',
      'space.html.item_2',
      'group.html.item_3',
      'group_1',
      'group.html.item_4',
      'group.html.item_41',
      'group.html.item_42',
      'group.html.item_43',
      'space.script.item_5',
      'space.script.item_6',
      'group.script.item_7',
      'group_2',
      'group.script.item_8',
      'group.script.item_81',
      'group.script.item_82',
      'group.script.item_83',
    ]);
  });
});
