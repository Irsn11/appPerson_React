import React, {useState} from "react";
//import avatar from "../img/avatar.png";
import './EmployeesList.scss';
import avatar from '../../img/avatar.png';

const EmployeeList = ({items}) => {
	const [visibleAddPopup, setVisibleAddPopup] = useState(false);
	const [visibleEditPopup,setVisibleEditPopup] = useState(false);
	 return (
		 <div className="app__row">
			 <div className="app__item header">
					 <div className="app__item-column"></div>
					 <div className="app__item-column">Имя</div>
					 <div className="app__item-column">Фамилия</div>
			 </div>
			<div className="app__main">	{
				 items.map((item, index) =>
					 <div key={index} className="app__item">
						 <div className="app__item-column"><img src={avatar} alt="lost icon" /></div>
 						<div className="app__item-column">{item.name}</div> 
						 <div className="app__item-column">{item.surename}
							 <div className="app__item-buttons">
								 <button className="app__item-edit"
								  onClick={()=>setVisibleEditPopup(true)}
								 >/</button>
							 <button className="app__item-delete ">X</button>
							 </div>
					 </div>
					</div>
			 )}</div>
			 <button className="btn"
			 onClick={()=>setVisibleAddPopup(true)}
			 >Добавить сотрудника</button>
			 {visibleAddPopup &&
				 <div className="app__popup popup">
					 <div className="popup__header">Создание сотрудника</div>
					 <form className="popup__body" action="">
					 <a onClick={() => setVisibleAddPopup(false)}  className="popup__close">Назад к списку</a>
						 <input className="popup__field" type="text" placeholder="Введите имя сотрудника" ></input>
						 <input className="popup__field" type="text" placeholder="Введите фамилию сотрудника" ></input>
						 <button>Сохранить</button>
					 </form>
				 
				 </div>
			 }
			 	 {visibleEditPopup &&
				 <div className="app__popup popup">
					 <div className="popup__header">Редактирование сотрудника</div>
					 <form className="popup__body" action="">
					 <a onClick={() => setVisibleEditPopup(false)} className="popup__close">Назад к списку</a>
						 <input className="popup__field" type="text"></input>
						 <input className="popup__field" type="text"></input>
						 <button className="btn">Сохранить</button>
					 </form>
				 
				 </div>
			 }
		 </div>
		

)}

export default EmployeeList;
