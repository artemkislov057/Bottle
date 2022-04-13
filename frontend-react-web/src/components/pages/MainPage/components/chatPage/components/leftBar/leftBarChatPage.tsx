import React, { useEffect, useState } from "react";
import './leftBarChatPage.css';
import { HeaderLeftBarChat } from "./headerLeftBarChat";
import { ChatUserItem } from "./chatUserItem";
import { WsDialogType } from "components/pages/MainPage/WsDialogType";
import { UserInfoType } from "components/pages/MainPage/UserInfoType";

// import defaultAvatar from '../../../interfaceMainPage/components/rightBarProfile/defaultAvatar.svg';
import defaultAvatar from '../newDefAvatar.svg'
import { WsGetMessageType } from "components/pages/MainPage/WsGetMessageType";

type TProps = {
    onClickOtherButton: Function,
    setCurrentDialog: React.Dispatch<React.SetStateAction<UserItem>>,
    updateDialogsInfo: boolean
}

type UserItem = {
    dialogInfo: WsDialogType;
    userInfo: UserInfoType;
    userAvatar: string;
}

export const LeftBarChat:React.FC<TProps> = React.memo((props) => {
    let init: Array<UserItem>;
    const [chatUsers, setChatUsers] = useState(init);//type maybe avatar, name, descr, maybe при нажатии на диалог нужно срать запрос, для этого надо какие то данные, мб тот же id бутылки или чата

    useEffect(() => {
        async function getChatUsers() {
            let selfResponse = await fetch('https://localhost:44358/api/account', {
                credentials: 'include'
            });
            let selfData = await selfResponse.json() as UserInfoType;
            const selfId = selfData.id;

            let responseDialogs = await fetch('https://localhost:44358/api/dialogs', {
                credentials: 'include'
            });
            let dialogs = await responseDialogs.json() as WsDialogType[];            
            console.log(dialogs);

            let items : [{dialogInfo: WsDialogType, userInfo:UserInfoType, userAvatar: string}];
            for(let e of dialogs) {
                let currentId = e.bottleOwnerId === selfId ? e.recipientId : e.bottleOwnerId;

                let responseUserInfo = await fetch(`https://localhost:44358/api/user/${currentId}`, {
                    credentials: 'include'
                });
                let userInfo = await responseUserInfo.json() as UserInfoType;

                let responseUserAvatar = await fetch(`https://localhost:44358/api/user/${currentId}/avatar`, {
                    credentials: 'include'
                });
                let userAvatarBlob = await responseUserAvatar.blob();
                let userAvatar = URL.createObjectURL(userAvatarBlob);
                if(items) {
                    items.push({dialogInfo: e, userInfo: userInfo, userAvatar: userAvatar});
                } else {
                    items = [{dialogInfo: e, userInfo: userInfo, userAvatar: userAvatar}];
                }
            }
            
            items.sort((x,y) => _compareTime(x.dialogInfo.lastMessage.dateTime, y.dialogInfo.lastMessage.dateTime));
            setChatUsers(items);
        }

        getChatUsers();
    }, [props.updateDialogsInfo]);

    function onClickChatUserItem(data: UserItem) {
        props.setCurrentDialog(data);
        // console.log(data)
    }

    function _compareTime(time1 : string, time2 : string) {
        let date1 = new Date(time1).getTime();
        let date2 = new Date(time2).getTime();
        return date1 - date2 > 0 ? -1 : 0
    }

    return <div className="chat-page-left-bar">
        <HeaderLeftBarChat onClickOtherButton={props.onClickOtherButton}/>{/*сделать поиск*/}
        <div className="chat-page-left-user-items">
            {chatUsers?.map(userItem => 
                <ChatUserItem 
                    key={userItem?.dialogInfo.id}
                    name={userItem.userInfo.nickname} 
                    demoDescript={userItem.dialogInfo.lastMessage?.value}
                    urlAvatar={userItem.userAvatar}
                    onClick={() => onClickChatUserItem(userItem)}/>
                )
            }            
        </div>
    </div>
})