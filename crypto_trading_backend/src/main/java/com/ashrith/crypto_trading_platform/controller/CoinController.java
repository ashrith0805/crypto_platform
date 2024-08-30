package com.ashrith.crypto_trading_platform.controller;

import com.ashrith.crypto_trading_platform.model.Coin;
import com.ashrith.crypto_trading_platform.services.CoinServiceImpl;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Stack;

@RestController
@RequestMapping("/coins")
public class CoinController {
    @Autowired
    CoinServiceImpl coinService;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping
   public ResponseEntity<List<Coin>> getCoinList(@RequestParam("page") int page) throws Exception {
        List<Coin> coins= coinService.getCoinList(page);
        return new ResponseEntity<>(coins,HttpStatus.OK);
    }

    @GetMapping("/{coinId}/chart")
    public ResponseEntity<JsonNode> getMarketChart(@PathVariable String  coinId, @RequestParam("days") int days) throws Exception {
        String coins= coinService.getMarketChart(coinId,days);
        JsonNode node=objectMapper.readTree(coins);
        /*
        Json node is a tree like strucutre of json objects each node in the tree
        can be an object basically can access the elements of the json object more easily.
        readTree is a method in hte objectmapper class within the jackson library
        that allows for conversion between json and java objects. PARSING THE JSON DATA
        INTO A JAVA OBJECT
        USE objectMApper readvalue for when you want to deserialize json data into a specific type of object
        or collection of objects. use readtree for when you want to retrieve a tree like collection
        that contains the entire json dom
         */
        return ResponseEntity.ok(node);
    }

    @GetMapping("details/{coinId}")
    public ResponseEntity<JsonNode> getCoinDetails(@PathVariable String  coinId) throws Exception {
        String coins= coinService.getCoinDetails(coinId);
        JsonNode node=objectMapper.readTree(coins);
        return  ResponseEntity.ok(node);
    }

    @GetMapping("/search")
    public ResponseEntity<JsonNode> search(@RequestParam("q") String keyword) throws Exception{
        String data=coinService.searchCoin(keyword);
        JsonNode node= objectMapper.readTree(data);
        return ResponseEntity.ok(node);
    }

    @GetMapping("/top50")
    public ResponseEntity<JsonNode> getTop50() throws JsonProcessingException,Exception{
        String top50=coinService.getTo50CoinsByMarketCapRank();
        JsonNode node=objectMapper.readTree(top50);
        return ResponseEntity.ok(node);
    }

    @GetMapping("/trending")
    public ResponseEntity<JsonNode> getTrending() throws JsonProcessingException,Exception{
        String trending=coinService.GetTrendingCoins();
        JsonNode node=objectMapper.readTree(trending);
        return ResponseEntity.ok(node);
    }

    @GetMapping("/{coinId}")
    public ResponseEntity<Coin> getCoinById(@PathVariable String coinId) throws Exception {
        Coin coin=coinService.findById(coinId);
        return new ResponseEntity<>(coin,HttpStatus.OK);
    }

}
