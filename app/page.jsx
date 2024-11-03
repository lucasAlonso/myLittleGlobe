'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ModeToggle } from '@/components/ui/toggle'
import { Earth } from '@/src/components/canvas/earth'
import { Cloud, Flashlight, TriangleIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const View = dynamic(() => import('@/src/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/src/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const theme = useTheme()
  const [triangles, setTriangles] = useState(32)
  const [lightIntensity, setLightIntensity] = useState(40)
  const [clouds, setClouds] = useState(true)

  return (
    <div className='bg-amber-100 dark:bg-slate-800 w-full h-full'>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5 text-teal-700 dark:text-white'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber</p>
          <p className='mb-8 text-2xl leading-normal'>A minimalist demostration of nextjs and threejs</p>
        </div>
      </div>
      <div className='fixed top-0 right-0 p-4 z-50 flex w-24 flex-wrap gap-2'>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              <TriangleIcon />
              <div>{triangles}</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Slider defaultValue={[32]} onValueChange={(value) => setTriangles(value)} min={4} max={64} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              <Flashlight />
              <div>{lightIntensity}</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Slider defaultValue={[40]} onValueChange={(value) => setLightIntensity(value)} min={10} max={90} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant='outline' className='flex gap-2  justify-center  items-center  p-1.5 rounded'>
          <Cloud className='h-4 w-4' />
          <Switch defaultChecked onCheckedChange={() => setClouds(!clouds)} defaultValue={true} />
        </Button>
      </div>
      <View className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
        <Earth
          night={theme.resolvedTheme === 'dark'}
          triangles={triangles}
          intensity={lightIntensity}
          clouds={clouds}
        />
        <Common />
      </View>
    </div>
  )
}
