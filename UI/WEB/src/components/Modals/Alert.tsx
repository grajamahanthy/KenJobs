export default interface AButton {
    id: number,
    value: string
  }

export default interface AAlert {
    type: string,
    title: string,
    body: string,
    clickEvent: (e:any, idx: number) => void,
    buttons: AButton[],
    showModal: false,
    onHide: () => void
  }

  