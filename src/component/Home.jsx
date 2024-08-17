import React from 'react'
import Users from './Users'
import Header from './Header';

export default function Home() {
  return (
      <div className="mt-8">
        <h1 className="font-bold text-3xl mr-[45%]">داشبور مدیریتی</h1>
        <Users />
      </div>
  );
}
