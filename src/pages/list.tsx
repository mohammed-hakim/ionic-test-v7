import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { addOutline, closeCircleOutline, trashBinOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import './list.css'
const List: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [selecedUser, setSelecedUser] = useState(null);
  const [presentingElement, setPresentingElement] = useState(null);
  const [activeSegment, setActiveSegment] = useState<any>('details');

  const page = useRef(null)
  const modal = useRef(null);
  const cardModal = useRef(null);


  useEffect(()=>{
    setPresentingElement(page.current)
  })

  useIonViewWillEnter(async () => {
    let users = await getUsers();

    console.log({ users });

    setUsers(users.results);
    setLoading(false);
  });
  const getUsers = async () => {
    let data = await fetch("https://randomuser.me/api?results=10");
    let users = await data.json();
    return users;
  };
  const clearList = () => {
    showAlert({
      header: "Confirm!",
      message: "Are You Sure ?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          handler(value) {
            setUsers([]);
            showToast({
              message: "all users deleted",
              duration: 2000,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (e: any) => {
    const data = await getUsers();
    setUsers(data.results);
    e.detail.complete();
  };

  return (
    <IonPage ref={page} >
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon
                slot="icon-only"
                icon={trashBinOutline}
                color={"light"}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color={"primary"}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={(e) => doRefresh(e)}>
          <IonRefresherContent />
        </IonRefresher>

        {loading &&
          [...Array(10)].map((_, i) => (
            <IonCard key={i}>
              <IonCardContent>
                <IonItem lines="none">
                  <IonAvatar class="ion-margin">
                    <IonSkeletonText />
                  </IonAvatar>

                  <IonLabel>
                    <IonSkeletonText animated style={{ width: "150px" }} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>

                  <IonChip slot="end" color={"primary"}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

        {users.map((x: any, i) => (
          <IonCard key={i} onClick={() => setSelecedUser(x)}>
            <IonCardContent>
              <IonItem lines="none">
                <IonAvatar class="ion-margin">
                  <IonImg src={x.picture.large} />
                </IonAvatar>

                <IonLabel>
                  {x.name.first} {x.name.last}
                  <p>{x.email}</p>
                </IonLabel>

                <IonChip slot="end" color={"primary"}>
                  {x.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}

        <IonModal
        

          ref={modal}
          isOpen={selecedUser !== null}
          onIonModalDidDismiss={() => setSelecedUser(null)}


          initialBreakpoint={0.5}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonHeader>
            <IonToolbar color={"light"}>
              <IonButtons slot="end">
                <IonButton onClick={() => (modal.current as any)?.dismiss()}>
                  <IonIcon slot="icon-only" icon={closeCircleOutline}></IonIcon>
                </IonButton>
              </IonButtons>
              <IonTitle>{(selecedUser as any)?.name?.first} {(selecedUser as any)?.name?.last}</IonTitle>
            </IonToolbar>
            <IonToolbar color={"light"}>
              <IonSegment value={activeSegment} onIonChange={(e)=>{setActiveSegment(e.detail.value)}}>
              <IonSegmentButton value="details">Details</IonSegmentButton>
              <IonSegmentButton value="calender">Calender</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
            </IonHeader>
          <IonContent className="ion-padding">
            {activeSegment == 'details' && (
                <IonCard>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonAvatar class="ion-margin">
                      <IonImg src={(selecedUser as any)?.picture.large} />
                    </IonAvatar>
    
                    <IonLabel>
                      {(selecedUser as any)?.name.first} {(selecedUser as any)?.name.last}
                      <p>{(selecedUser as any)?.email}</p>
                    </IonLabel>
    
                    <IonChip slot="end" color={"primary"}>
                      {(selecedUser as any)?.nat}
                    </IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            )}
             {activeSegment == 'calender' && (
                <IonDatetime mode="ios" className="ion-margin-auto"/>
            )}
          </IonContent>
        </IonModal>
        
       
        <IonModal
          ref={cardModal}
          trigger="card-modal"
          mode="ios"
          presentingElement={presentingElement!} //only in ios
        >
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonButtons slot="end">
                <IonButton onClick={() => (cardModal.current as any)?.dismiss()}>
                  <IonIcon slot="icon-only" icon={closeCircleOutline}></IonIcon>
                </IonButton>
              </IonButtons>
              <IonTitle>Card Modal</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <p>My Card Modal</p>
          </IonContent>
        </IonModal>
        <IonFab className="ion-margin" vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton id="card-modal">
              <IonIcon icon={addOutline} />
            </IonFabButton>
        </IonFab>
 


      </IonContent>
    </IonPage>
  );
};

export default List;
