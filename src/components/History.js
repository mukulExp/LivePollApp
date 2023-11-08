
import { Card } from 'flowbite-react';
// import Image from 'next/image';

function ChatHistory({chatMessages,isTyping}) {
  return (
    <Card className="max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Chat History</h5>
      </div>
      <div className="flow-root">
        <h2> {isTyping ? `${isTyping || 'someone'} is typing ....` : '' } </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {chatMessages.map((msg)=>{
                return (
                    <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          alt="Neil image"
                          height="32"
                          src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
                          width="32"
                          className="rounded-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{msg.username || 'Neil Sims'}</p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">{msg.message}</p>
                      </div>
                    </div>
                  </li>
                )
            })}
        
         
        </ul>
      </div>
    </Card>
  );
}
export default ChatHistory;
