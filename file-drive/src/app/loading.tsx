import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="my-12 flex flex-col items-center justify-center space-y-8">
      <Loader2 className="animate-spin" size={24} />
    </div>
  );
}

export default Loading