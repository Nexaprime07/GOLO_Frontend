"use client";

import { Send, Link } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const getAvatarUrl = (avatar, name) => {
  if (avatar && String(avatar).trim()) return avatar;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=157A4F&color=ffffff&size=128`;
};

export default function ChatWindow({
  conversation,
  messages = [],
  currentUserId,
  loading = false,
  sending = false,
  onSendMessage,
}) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const message = text.trim();
    if (!message || !conversation || sending) return;
    onSendMessage?.(message);
    setText("");
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm px-6 text-center">
        Select a conversation or click Chat on an ad to start messaging.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F6F2]">

      {/* HEADER (Fixed) */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4">
          <img
            src={getAvatarUrl(conversation?.otherUser?.avatar, conversation?.otherUser?.name)}
            width={45}
            height={45}
            alt={conversation?.otherUser?.name || "User"}
            className="rounded-full object-cover"
          />
          <h3 className="font-semibold text-lg text-gray-800">
            {conversation?.otherUser?.name || "User"}
          </h3>
        </div>

        <div className="text-xs text-gray-500 text-right">
          <p>{conversation?.ad?.title || "Ad conversation"}</p>
          {conversation?.ad?.price !== undefined && conversation?.ad?.price !== null && (
            <p className="font-semibold text-[#157A4F]">₹{Number(conversation.ad.price).toLocaleString("en-IN")}</p>
          )}
        </div>
      </div>

      {/* SCROLLABLE MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">

        {(conversation?.ad?.title || conversation?.lastMessageAdTitle) && (
          <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
            {conversation?.ad?.image ? (
              <img
                src={conversation.ad.image}
                alt={conversation?.ad?.title || conversation?.lastMessageAdTitle || "Ad"}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500">
                Ad
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Chat about this ad</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {conversation?.lastMessageAdTitle || conversation?.ad?.title}
              </p>
              <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                {conversation?.ad?.price !== undefined && conversation?.ad?.price !== null && (
                  <span className="font-semibold text-[#157A4F]">₹{Number(conversation.ad.price).toLocaleString("en-IN")}</span>
                )}
                {conversation?.ad?.location && <span className="truncate">{conversation.ad.location}</span>}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-sm text-gray-500">Loading messages...</div>
        )}

        {!loading && messages.length === 0 && (
          <div className="text-sm text-gray-500">No messages yet. Say hi 👋</div>
        )}

        {messages.map((message) => {
          const isMine = String(message.senderId) === String(currentUserId);
          return (
            <div
              key={message.id}
              className={`${
                isMine
                  ? "bg-[#157A4F] text-white ml-auto"
                  : "bg-white border border-gray-200 text-gray-800"
              } p-4 rounded-2xl w-fit max-w-sm shadow-sm`}
            >
              {message.adTitle && (
                <div className={`text-[10px] mb-1 ${isMine ? "text-green-100" : "text-gray-500"}`}>
                  Regarding: {message.adTitle}
                </div>
              )}
              {message.text}
              <div className={`text-xs mt-2 ${isMine ? "text-green-100" : "text-gray-400"}`}>
                {formatTime(message.createdAt)}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />

      </div>

      {/* INPUT (Fixed) */}
      <div className="px-8 py-4 bg-white border-t border-gray-200 flex items-center gap-4 shrink-0">
        <Link
          size={20}
          className="text-gray-400 cursor-pointer hover:text-[#F5B849] transition"
        />

        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-[#F8F6F2] rounded-full px-6 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#157A4F]"
        />

        <button
          onClick={handleSend}
          disabled={sending || !text.trim()}
          className="bg-[#F5B849] text-white p-3 rounded-full hover:bg-[#e0a837] transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>

    </div>
  );
}