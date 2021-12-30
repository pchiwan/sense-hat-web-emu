import { h } from 'preact'

import { Table, TableCell, TableRow } from './table'
import { rgbArrayToString, isPerfectSquare  } from '../utils'

const LedMatrix = ({ getRef, showCellBorders, matrix }) => {
  if (!matrix || !matrix.length || !isPerfectSquare(matrix.length)) {
    return null
  }

  const MatrixSize = Math.sqrt(matrix.length)

  return (
    <Table getRef={getRef}>{
      [...Array(MatrixSize)].map((_, i) => (
        <TableRow key={`tr-${i}`}>
          {matrix
            .slice(i * MatrixSize, i * MatrixSize + MatrixSize)
            .map((value, j) => (
              <TableCell
                key={`td-${i}-${j}`}
                color={rgbArrayToString(value)}
                showBorder={showCellBorders}
              />
            ))
          }
        </TableRow>
      ))}
    </Table>
  )
}

export default LedMatrix
