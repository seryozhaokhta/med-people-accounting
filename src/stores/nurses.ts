import { defineStore } from 'pinia'
import nursesData from '../data/nurses.json'

export interface Nurse {
    id: number
    fullName: string
    department: string
}

export const useNursesStore = defineStore('nurses', {
    state: () => ({
        nurses: [...nursesData] as Nurse[],
    }),
    actions: {
        addNurse(nurse: Nurse) {
            this.nurses.push(nurse)
            this.saveToLocalStorage()
        },
        updateNurse(updatedNurse: Nurse) {
            const index = this.nurses.findIndex(n => n.id === updatedNurse.id)
            if (index !== -1) {
                this.nurses[index] = updatedNurse
                this.saveToLocalStorage()
            }
        },
        deleteNurse(id: number) {
            this.nurses = this.nurses.filter(n => n.id !== id)
            this.saveToLocalStorage()
        },
        saveToLocalStorage() {
            localStorage.setItem('nurses', JSON.stringify(this.nurses))
        },
        loadFromLocalStorage() {
            const data = localStorage.getItem('nurses')
            if (data) {
                this.nurses = JSON.parse(data)
            }
        }
    },
})
