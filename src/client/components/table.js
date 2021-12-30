import { h } from 'preact'

export const Table = ({ children, getRef }) => (
  <table
    ref={getRef}
    cellPadding='0'
    cellSpacing='0'
    className="table"
  >
    <tbody>
      {children}
    </tbody>
  </table>
)

Table.defaultProps = {
  getRef: () => {}
}

export const TableRow = ({ children }) => (
  <tr className="table-row">{children}</tr>
)

export const TableCell = ({ key, color, showBorder }) => (
  <td
    key={key}
    className={`table-cell ${showBorder ? 'with-border' : ''}`}
    style={{ backgroundColor: color }}
  />
)
