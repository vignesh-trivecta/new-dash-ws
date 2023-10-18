import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const TableShimmer = ({datas}) => {
  return (
    <div className="border" style={{ height: '380px' }}>
        <Table className="w-full">
            <Thead className=" h-10 bg-gray-50">
                <Tr>
                    <Th>
                        <Td>&nbsp;</Td>
                    </Th>
                    <Th>
                        <Td>&nbsp;</Td>
                    </Th>
                    <Th>
                        <Td>&nbsp;</Td>
                    </Th>
                    <Th>
                        <Td>&nbsp;</Td>
                    </Th>
                </Tr>
            </Thead>
            <Tbody className="border h-10">
                <Tr>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                </Tr>
                <Tr className="border h-10">
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                </Tr>
                <Tr className="border h-10">
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                </Tr>
                <Tr className="border h-10">
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                    <Td>
                        <p className='p-2 bg-gray-100'>&nbsp;</p>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    </div>
  )
}

export default TableShimmer