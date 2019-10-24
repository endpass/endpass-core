import tag from '../../../lib/matches/tag';

describe('tag match content', () => {
  const content = `
  <some> 
    <i18n
      path='space.html.item_1'
    />
    <i18n    path="space.html.item_2"
    ></i18n>
    <i18n path="group.html.item_3"/>
    <i18n path='group_1'></i18n>

    <i18n path=not.html.item_0'>
    <i18npath="not.space.html.item_1"/>
    i18n path="not.space.html.item_2"
  </some>
  `;

  it('should parse and extract lang blocks', async () => {
    const matches = tag(content);

    expect(matches).toEqual([
      'space.html.item_1',
      'space.html.item_2',
      'group.html.item_3',
      'group_1',
    ]);
  });
});
