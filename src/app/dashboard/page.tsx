"use client"
import { useState } from "react"
import KanbanBoard from "@/components/component/KanbanBoard"
import { KanbanProvider } from "@/context/kanbanContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModalSection } from "@/components/ui/modal-section"
import { Button } from "@/components/ui/button"

function KanbanPage(){
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(prevModal => !prevModal)
  }
  const router = useRouter()
   useEffect(() => {
    if (!localStorage.token)
      router.push("/login") 
     } , []) 
     
  return(
    <KanbanProvider>
      <KanbanBoard />
      <div className="flex justify-end mb-6 m-6">
          <Button onClick={toggleModal}>Add Section</Button>
        </div>
      {modal && (
        <div className="fixed inset-0 bg-opacity-30 bg-background-opacity flex justify-center items-center">
          <ModalSection toggleModal={toggleModal}/>
        </div>
      )}
    </KanbanProvider>
  )
}

export default KanbanPage