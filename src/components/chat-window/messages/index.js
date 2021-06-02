/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase';
import { transformToArrayWithId } from '../../../misc/Helper';
import MessageItem from './MessageItem';

function Messages() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = database.ref('/messages');

    messageRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrayWithId(snap.val());

        setMessages(data);
      });

    return () => {
      messageRef.off('value');
    };
  }, [chatId]);

  const handleAdmin = useCallback(
    async uid => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);

      let alertMsg;
      await adminsRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin Permission Removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Admin Permission Granted';
          }
        }

        return admins;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  const handelLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);
    let alertMsg;
    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'Like Removed';
        } else {
          msg.likeCount += 1;

          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
          alertMsg = 'Like Added';
        }
      }

      return msg;
    });
    Alert.info(alertMsg, 4000);
  });

  const handeleDelete = useCallback(
    async (msgId, file) => {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Delte this message')) {
        return;
      }
      const isLast = messages[messages.length - 1].id === msgId;
      const updates = {};

      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msdId: messages[messages.length - 2].id,
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
        Alert.info('Message has been deleted');
      } catch (err) {
        return Alert.error(err.message);
      }
      if (file) {
        try {
          const fileRef = storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (err) {
          Alert.error(err.message);
        }
      }
    },
    [chatId, messages]
  );
  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages ye</li>}
      {canShowMessages &&
        messages.map(msg => (
          <MessageItem
            key={msg.id}
            message={msg}
            handleAdmin={handleAdmin}
            handelLike={handelLike}
            handeleDelete={handeleDelete}
          />
        ))}
    </ul>
  );
}

export default Messages;
