import { useState, useMemo, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import "./../main.css";

const Polls = ({pollOptions,handleVote}) => {
  
  const totalVotes = 0;
 
  return (
    <>
    {pollOptions?.map((poll,index)=>{
        return (
            <div className="w-full max-w-2xl mx-auto p-8">
            <h1 className="text-2xl font-bold">{poll?.question ?? "Loading..."}</h1>
            {poll && (
              <p className="leading-relaxed text-gray-500">
                Cast your vote for one of the options.
              </p>
            )}
            {poll.question && (
              <div className="mt-4 flex flex-col gap-4">
                {poll?.options?.map((option,index) => (
                  <Card
                    key={index}
                    className="relative transition-all duration-300 min-h-[130px]"
                  >
                    <div className="z-10">
                      <div className="mb-2">
                        <h2 className="text-xl font-semibold">{option.text}</h2>
                        <p className="text-gray-700">{option.description}</p>
                      </div>
                      <div className="absolute bottom-5 right-5">
                        {<Button onClick={() => handleVote(poll._id,index)}>Vote</Button>}
                      </div>
                    </div>
                    <div className="absolute top-5 right-5 p-2 text-sm font-semibold bg-gray-100 rounded-lg z-10">
                      {option.votes}
                    </div>
                    
                  </Card>
                ))}
              </div>
            )}
          </div>
        )
    })}
   
    </>
  );
};
export default Polls;
