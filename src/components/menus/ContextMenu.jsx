import { useContext, useMemo } from 'react';
import { ContextMenu as WxContextMenu } from '@svar-ui/react-menu';
import { context } from '@svar-ui/react-core';
import { defaultMenuOptions } from '../../../src';
import { locale } from "@svar-ui/lib-dom";
import { en } from "@svar-ui/grid-locales";

function ContextMenu({
  api,
  options = defaultMenuOptions,
  at = 'point',
  resolver,
  dataKey,
  filter,
  css,
  children,
  handler,
  onClick,
}) {
  const i18n = useContext(context.i18n);
  const _ = useMemo(() => i18n ? i18n.getGroup('grid') : locale(en).getGroup('grid'), [i18n]);

  const localize = (options) => {
    return options.map((o) => {
      o.text = _(o.text);
      return o;
    });
  };

  function getItem(id) {
    if (id) api.exec('select-row', { id });
    return id;
  }

  const handleClicks = (ev) => {
    const option = ev.action;
    if (option) {
      const id = api.getState().selectedRows[0];
      switch (option.id) {
        case 'add:before':
          api.exec('add-row', { row: {}, before: id });
          break;
        case 'add:after':
          api.exec('add-row', { row: {}, after: id });
          break;
        case 'copy':
          api.exec('add-row', {
            row: { ...api.getRow(id), id: null },
            after: id,
          });
          break;
        case 'delete':
          api.exec('delete-row', { id });
          break;
        default:
          onClick(ev);
      }
    }
  };

  const resolverProp = resolver !== undefined ? resolver : getItem;

  return (
    <WxContextMenu
      css={`wx-KKGLK8TH wx-table-menu ${css}`}
      at={at}
      dataKey={dataKey}
      handler={handler}
      options={localize(options)}
      resolver={resolverProp}
      filter={filter}
      onClick={handleClicks}
    >
      {children}
    </WxContextMenu>
  );
}

export default ContextMenu;
