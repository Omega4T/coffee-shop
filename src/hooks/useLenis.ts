'use client' // Komponen ini menggunakan API browser, jadi harus client component

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup function untuk menghapus instance saat komponen tidak lagi digunakan
    return () => {
      lenis.destroy()
    }
  }, [])
}
