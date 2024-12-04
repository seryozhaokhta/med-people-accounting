import { defineStore } from 'pinia'
import doctorsData from '../data/doctors.json'

export interface Doctor {
    id: number
    fullName: string
    department: string
    isHead: boolean
}

export const useDoctorsStore = defineStore('doctors', {
    state: () => ({
        doctors: [...doctorsData] as Doctor[],
    }),
    actions: {
        addDoctor(doctor: Doctor) {
            this.doctors.push(doctor)
            this.saveToLocalStorage()
        },
        updateDoctor(updatedDoctor: Doctor) {
            const index = this.doctors.findIndex(d => d.id === updatedDoctor.id)
            if (index !== -1) {
                this.doctors[index] = updatedDoctor
                this.saveToLocalStorage()
            }
        },
        deleteDoctor(id: number) {
            this.doctors = this.doctors.filter(d => d.id !== id)
            this.saveToLocalStorage()
        },
        saveToLocalStorage() {
            localStorage.setItem('doctors', JSON.stringify(this.doctors))
        },
        loadFromLocalStorage() {
            const data = localStorage.getItem('doctors')
            if (data) {
                this.doctors = JSON.parse(data)
            }
        }
    },
})
