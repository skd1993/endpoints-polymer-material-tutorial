package com.endpoints.tutorial;

import java.util.Date;
import java.util.Random;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.Named;

@Api(
	    name = "greetings",  /* mandatory, otherwise replaced with "myapi"*/
	    version = "v1",
	    description = "A simple and polite API"
	)
public class GreetingsAPI
{
	@ApiMethod(name = "hello")
	public Greeting hello(@Named("who") String who)
	{
		String text = new String("Hello ").concat(who);
		Greeting g = new Greeting(text, new Random(new Date().getTime()).nextInt(16));
		return g;
	}
}