import axios from 'axios'
import { Button } from './ui/button'

import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import useStore from '@/store/store'
import { useEffect, useState } from 'react'
import { EllipsisVertical } from 'lucide-react'

const tableHeader = ['Name', 'Category', 'For Type', 'Price', 'Area', 'Rating ', 'Action ']

export interface DataT {
  _id: string
  name: string
  location: string
  price: number
  monthly_price: number
  area: string
  beds: number
  baths: number
  for_type: string
  ratings: string
  reviews: number
  description: string
  images: string[]
  latitude: string
  longitude: string
  category: {
    _id: string
    name: string
  }
  __v: number
}

export default function PropertyList() {
  const token = useStore((state) => state.token)
  const [property, setProperty] = useState<DataT[]>([])
  const [data, setData] = useState<DataT | null>()

  async function AddProperty() {
    console.log(data)

    try {
      const response = await axios.post(
        'https://adventus-admin-api.pdwap.store/api/backend/property',
        {
          data: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'accept-Language': 'en',
          },
        },
      )
      console.log(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function getProperty() {
    try {
      const response = await axios.get('https://adventus-admin-api.pdwap.store/api/backend/property?limit=20&offset=0&sort=ASC', {
        headers: {
          Authorization: `Bearer ${token}`,
          'accept-Language': 'en',
        },
      })
      console.log(response)
      setProperty(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProperty()
  }, [])

  return (
    <div className='space-y-5 p-5'>
      <div className='flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Property List</div>
        <div className='flex items-center gap-3'>
          <div>
            <Input placeholder='Search' />
          </div>
          <Button
            className='bg-blue-500 hover:bg-blue-500/70'
            onClick={() => {
              AddProperty()
            }}
          >
            {' '}
            Add Property
          </Button>
        </div>
      </div>
      <div className='rounded-xl border border-white/10'>
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeader.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {property.map((property, index) => (
              <TableRow key={index}>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.category ? `${property.category.name}` : 'NA'} </TableCell>
                <TableCell>{property.for_type}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>{property.area}</TableCell>
                <TableCell>{property.ratings}</TableCell>
                <TableCell>
                  <EllipsisVertical />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
