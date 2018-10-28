import React from 'react'
import { ToastContainer } from 'react-toastr';

class Notifier extends React.Component
{
  updateNotify()
  {
    this.refs.container.info('toastr');
  }
  render()
  {
    return(
      <ToastContainer ref="container"
      className="toast-top-right" />
    );
  }
}